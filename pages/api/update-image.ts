import { fileTypeFromBuffer } from "file-type";
import { File, IncomingForm } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import sharp from "sharp";
import type { Readable } from "stream";
import type { tOutput } from "../../types/image-state";
import type { IError, IUpdateImage } from "../../types/update-image-interface";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const OUTPUT_ARR: tOutput[] = ["png", "jpeg", "webp"];

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const buffer: Uint8Array[] = [];

  return new Promise((resolve, reject) =>
    stream
      .on("error", (err) => reject(err))
      .on("data", (data) => buffer.push(data))
      .on("end", () => resolve(Buffer.concat(buffer)))
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUpdateImage | IError>
) {
  const form = new IncomingForm({
    maxFields: 2,
    maxFileSize: 5 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const { file } = files;
    if (!(file as File[]).length) {
      let buff: Buffer;
      try {
        buff = await streamToBuffer(
          fs.createReadStream((file as File).filepath)
        );
      } catch (_) {
        return res.status(400).json({
          message: "Can not read sent image",
        });
      }

      const types = await fileTypeFromBuffer(buff);
      if (!types || types.mime.split("/")[0] !== "image") {
        return res.status(400).json({
          message: "File is not a valid image",
        });
      }

      const { quality, output } = fields;

      if (!quality || typeof quality !== "string")
        return res.status(400).json({
          message: "Quality has to be a valid field",
        });

      const intQuality = parseInt(quality);
      if (isNaN(intQuality))
        return res.status(400).json({
          message: "Quality needs to be a valid string float",
        });
      if (intQuality > 100)
        return res.status(400).json({
          message: "Quality can't be higher than 100%",
        });
      if (intQuality < 10)
        return res.status(400).json({
          message: "Quality can't be lower than 10%",
        });

      if (!output || typeof output !== "string")
        return res.status(400).json({
          message: "Output needs to be a valid string",
        });

      if (!OUTPUT_ARR.find((o) => o === output))
        return res.status(400).json({
          message: "Please select a valid output",
        });

      switch (output as tOutput) {
        case "png":
          buff = await sharp(buff).png({ quality: intQuality }).toBuffer();
          break;
        case "webp":
          buff = await sharp(buff).webp({ quality: intQuality }).toBuffer();
          break;
        case "jpeg":
        default:
          buff = await sharp(buff)
            .jpeg({
              quality: intQuality,
              mozjpeg: true,
            })
            .toBuffer();
          break;
      }

      res.status(200).json({
        base64: buff.toString("base64"),
      });
    } else {
      res.status(400).json({
        message: "You can only compress a single image at a time",
      });
    }
  });
}

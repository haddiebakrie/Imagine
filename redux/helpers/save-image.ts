import type { tOutput } from "../../types/image-state";
import { IError, IUpdateImage } from "../../types/update-image-interface";

const saveImage = async (
  file: File,
  quality: number,
  output: tOutput
): Promise<File> => {
  const formData = new FormData();
  formData.append("quality", quality.toString());
  formData.append("output", output);
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch("/api/update-image", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    throw new Error("Error in trying to compress the image");
  }

  if (response.status === 400) {
    const { message }: IError = await response.json();
    throw new Error(message);
  }

  const { base64 }: IUpdateImage = await response.json();
  const image = new File([Buffer.from(base64, "base64")], "current-image", {
    type: `image/${output}`,
  });
  return image;
};

export default saveImage;

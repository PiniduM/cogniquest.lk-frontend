import axios, { AxiosRequestConfig } from "axios";

const uploadProjectFile = async (
  projectFileUploadToken: string,
  ProjectFile: Blob
) => {
  const formData = new FormData();
  console.log(ProjectFile);
  formData.append("file", ProjectFile);
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/upload/project_file`;
  const fileUploadConfig: AxiosRequestConfig<FormData> = {
    headers: {
      Authorization: `Bearer ${projectFileUploadToken}`,
    },
  };
  await axios.post(url, formData, fileUploadConfig);
};

export default uploadProjectFile;

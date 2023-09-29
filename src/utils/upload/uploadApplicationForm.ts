import axios, { AxiosRequestConfig } from "axios";

const uploadApplicationForm = async (
  applicationFormUploadToken: string,
  applicationForm: Blob
) => {
  const formData = new FormData();
  console.log(applicationForm);
  console.log(typeof applicationForm);

  formData.append("file", applicationForm);
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/upload/application_form`;
  const fileUploadConfig: AxiosRequestConfig<FormData> = {
    headers: {
      Authorization: `Bearer ${applicationFormUploadToken}`,
    },
  };
  await axios.post(url, formData, fileUploadConfig);
};

export default uploadApplicationForm;

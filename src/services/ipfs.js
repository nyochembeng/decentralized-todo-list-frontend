import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export const addTaskToIPFS = async (taskContent) => {
  const result = await client.add(taskContent);
  return result.path;
};

export const getTaskFromIPFS = async (hash) => {
  const chunks = [];
  for await (const chunk of client.cat(hash)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
};

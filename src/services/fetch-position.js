// @ts-check

import axios from "./axios-setup";

export default async function fetchPosition() {
  const URL = "/get-arm-position";

  try {
    let { status, data } = await axios.get(URL);

    if (status === 200) {
      return {
        error: "",
        data
      };
    } else {
      return {
        error: "Não pode obter os dados do servidor",
        data: {}
      };
    }
  } catch (e) {
    console.log(e);
    return {
      error: "Não pode obter os dados do servidor",
      data: {}
    };
  }
}

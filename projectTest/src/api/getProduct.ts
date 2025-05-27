import axios from "axios";
import { ApiResponse } from "../type/product";
// import { ApiResponse } from "../type/product";

export async function getProduct() {
  try {
    const response = await axios.get<ApiResponse>(
      "https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData"
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os produtos", error);
    throw new Error("Erro ao buscar os produtos");
  }
}

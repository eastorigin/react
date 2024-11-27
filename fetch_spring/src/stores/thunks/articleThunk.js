import { getArticleList } from "../../components/http/http";
import { articleAction } from "../ToolkitStore";

export const readArticles = (pageNo) => {
  return async (dispatcher) => {
    dispatcher(articleAction.startRequest()); // isLoading = true
    try {
      const articleList = await getArticleList(pageNo);
      dispatcher(articleAction.readList(articleList));
    } catch (e) {
      dispatcher(articleAction.setErrors(e.message));
    } finally {
      dispatcher(articleAction.endRequest()); // isLoading = false
    }
  };
};

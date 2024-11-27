import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/forum/Login";
import ArticleList from "../components/forum/ArticleList";
import ArticleForm from "../components/forum/ArticleForm";
import MainLayout from "../components/ui/MainLayout";

/**
 * URL 별로 노출시킬 컴포넌트 정의
 */

export default function AppRouterProvider() {
  // Router 생성
  // Spring -> Controller
  // Controller -> URL -> JSP
  // React -> URL -> Component
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        { path: "/articles", element: <ArticleList /> },
        { path: "/write", element: <ArticleForm /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

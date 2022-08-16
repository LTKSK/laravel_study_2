import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-location";

export function AuthGuard(props: { children: ReactElement }) {
  const { data } = useQuery(["user"], () =>
    fetch("http://localhost:8000/api/user", {
      mode: "cors",
      credentials: "include",
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("userの取得に失敗しました");
        return resp.json();
      })
      .then((resp) => {
        return resp.data;
      })
  );
  const isLoggedIn = !!data;

  if (!isLoggedIn) return <Navigate to="/login" />;
  return props.children;
}

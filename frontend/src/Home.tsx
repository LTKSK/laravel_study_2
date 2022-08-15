import { useQuery } from "@tanstack/react-query";

type User = { name: string; email: string; password: string };

export function Home() {
  const { data, error, isLoading } = useQuery(["user"], () =>
    fetch("http://localhost:8000/api/user", {
      mode: "cors",
      credentials: "include",
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("userの取得に失敗しました");
        return resp.json();
      })
      .then((resp) => {
        // TODO: validate by any type check libraries
        return resp.data as User;
      })
  );

  if (isLoading) return <div>...loading</div>;
  if (error) return <div>Something went wrong...</div>;

  return <div>名前は{data?.name}です</div>;
}

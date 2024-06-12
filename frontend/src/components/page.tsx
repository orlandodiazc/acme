import { type ReactNode, useEffect } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Page({ title = "", children }: Props) {
  const newTitle = title !== "" ? `${title} ･ Acme` : "Acme Dashboard";

  useEffect(() => {
    document.title = newTitle;
  }, [newTitle]);

  return children;
}

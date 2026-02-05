import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

export default function NotesLayout({ children, modal }: Props) {
  return (
    <main>
      {children}
      {modal}
    </main>
  );
}

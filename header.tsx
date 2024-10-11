import React from "react";
import sc from "./header.module.css";
import Container from "@/components/Container";

interface HeaderProps {
  data: [];
}

export default function Header({ data }: Readonly<HeaderProps>) {
  console.dir(data, { depth: null });

  const componentsData: { [key: string]: any } = {};

  data.forEach((comp) => {
    const component = comp["__component"] as string;
    const compName = component.split(".").pop();

    if (compName) {
      componentsData[compName] = comp; // Используем compName только если оно определено
    }
  });

  console.dir(componentsData, { depth: null });

  const imgUrl = componentsData["header-logo"]?.Image.data
    ? `http://localhost:1337${componentsData["header-logo"].Image.data.attributes.url}`
    : null;
  const text = componentsData["header-text"]?.Text
    ? componentsData["header-text"].Text
    : null;

  console.log(text);

  return (
    <header className={sc.section}>
      <Container>
        {imgUrl && <img src={imgUrl} alt="Logo" />}
        {text && <p style={{ color: "#fff" }}>{text}</p>}
      </Container>
    </header>
  );
}

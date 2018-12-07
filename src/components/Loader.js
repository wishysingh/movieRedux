import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";
import "../styles/styles.css";

const Loader = () => (
  <Section>
    <Title>just a sec</Title>
    <Article key={list[4].prop}>
      <ReactLoading type={list[4].prop} color="#fff" />
      <Prop>{list[4].name}</Prop>
    </Article>
  </Section>
);

export default Loader;

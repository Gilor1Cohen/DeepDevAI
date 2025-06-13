import { useCallback, useState } from "react";

import { faqs } from "../../../data/FAQ";
import { ToolsList } from "../../../data/ToolsList";

import type { ToolsListItem } from "../../../types/tools.types";

import Btn from "../../ui/btn/Btn";
import FAQItem from "../../ui/FAQItem/FAQItem";

import "./LandingPage.css";

export default function LandingPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = useCallback((id: number): void => {
    setOpenId((prev: number | null) => (prev === id ? null : id));
  }, []);

  return (
    <section id="LandingPage">
      <article id="hero-article">
        <h1 id="hero-article-h">DeepDevAI</h1>
        <p id="hero-article-p">
          Supercharge your development with intuitive AI assistance for
          everything from understanding APIs to generating polished UI concepts
          - right when you need it.
        </p>

        <Btn text={"Get Started"} link={"/SignUp"} />
      </article>

      <article id="tools-article">
        <h2 id="tools-article-h">Available Tools</h2>
        <div id="tools-list">
          {ToolsList.map((tool: ToolsListItem, index) => (
            <h3 key={index} className="tool-name">
              {tool.name}
            </h3>
          ))}
        </div>
      </article>

      <article className="faq">
        {faqs.map(
          (faq: { question: string; answer: string }, index: number) => (
            <FAQItem
              key={index}
              id={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === index}
              onToggle={toggle}
            />
          )
        )}
      </article>
    </section>
  );
}

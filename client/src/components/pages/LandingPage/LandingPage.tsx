import { useCallback, useState } from "react";

import { faqs } from "../../../data/FAQ";
import { ToolsList } from "../../../data/ToolsList";

import type { ToolsListItem } from "../../../types/tools.types";

import Btn from "../../ui/btn/Btn";
import FAQItem from "../../ui/FAQItem/FAQItem";

import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = useCallback((id: number): void => {
    setOpenId((prev: number | null) => (prev === id ? null : id));
  }, []);

  return (
    <>
      <nav id="LandingPage-Nav">
        <div id="logo">
          <h1>DeepDevAI</h1>
        </div>

        <div id="shortcuts">
          <a href="#tools-article">Tools</a>
          <a href="#HowArticle">About</a>
          <a href="#faq">FAQ</a>
        </div>

        <div id="btns">
          <Link to={"/SignUp"}>
            <Btn text={"Get Started"} type={"button"} isDisabled={false} />
          </Link>

          <Link to={"/LogIn"}>
            <Btn text={"Log In"} type={"button"} isDisabled={false} />
          </Link>
        </div>
      </nav>
      <section id="LandingPage">
        <article id="hero-article">
          <h1 id="hero-article-h">DeepDevAI</h1>
          <p id="hero-article-p">
            Supercharge your development with intuitive AI assistance for
            everything from understanding APIs to generating polished UI
            concepts - right when you need it.
          </p>

          <Link to={"/SignUp"}>
            <Btn text={"Get Started"} type={"button"} isDisabled={false} />
          </Link>
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

        <article id="HowArticle">
          <h1>How does it work?</h1>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <h2>Choose a Tool</h2>
              <p>Select from our suite of AI-powered features.</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h2>Write Your Request</h2>
              <p>Describe what you need in plain English.</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h2>Get Instant Results</h2>
              <p>Receive AI-generated outputs right away.</p>
            </div>
          </div>
        </article>

        <article id="faq">
          <h1>Do you have any questions?</h1>
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
    </>
  );
}

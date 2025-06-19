import type { ApiDescription } from "../../../../types/tools.types";
import "./ApiExplainerResult.css";

export default function ApiExplainerResult({ data }: { data: ApiDescription }) {
  console.log(data);

  return (
    <article className="ApiExplainerResult">
      <h1 className="apiName">{data.apiName}</h1>
      <p className="overview">{data.overview}</p>

      <section className="endpoints">
        <h2>Endpoints</h2>
        {data.endpoints.map((ep: any, i: any) => (
          <div key={i} className="endpoint">
            <header>
              <code>{ep.method}</code> <span>{ep.path}</span>
            </header>
            <p>{ep.description}</p>
            {ep.exampleRequest && (
              <pre className="exampleRequest">{ep.exampleRequest}</pre>
            )}
            {ep.exampleResponse && (
              <pre className="exampleResponse">{ep.exampleResponse}</pre>
            )}
          </div>
        ))}
      </section>

      {data.parameters && data.parameters.length > 0 && (
        <section className="parameters">
          <h2>Parameters</h2>
          <ul>
            {data.parameters.map((p: any, i: any) => (
              <li key={i}>
                <strong>{p.name}</strong> (<em>{p.in}</em>, {p.type})
                {p.required && " *"} – {p.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.errors && data.errors.length > 0 && (
        <section className="errors">
          <h2>Errors</h2>
          <ul>
            {data.errors.map((e: any, i: any) => (
              <li key={i}>
                <code>{e.code}</code> – {e.message}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

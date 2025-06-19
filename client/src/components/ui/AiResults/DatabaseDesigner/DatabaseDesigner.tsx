import type {
  DatabaseDesigner,
  Table,
  Field,
} from "../../../../types/tools.types";
import "./DatabaseDesigner.css";

export default function DatabaseDesigner({ data }: { data: DatabaseDesigner }) {
  console.log(data);

  return (
    <article className="DatabaseDesignerResult">
      <h1 className="dbName">{data.dbName}</h1>

      <section className="tables">
        {data.tables.map((table: Table, tableIdx: number) => (
          <div key={tableIdx} className="table">
            <h2 className="tableName">{table.name}</h2>
            {table.description && (
              <p className="tableDescription">{table.description}</p>
            )}

            <div className="fields">
              {table.fields.map((field: Field, fieldIdx: number) => (
                <div key={fieldIdx} className="field">
                  <p className="fieldName">
                    <strong>{field.name}</strong>: {field.type}
                  </p>
                  {field.constraints && (
                    <p className="fieldConstraint">{field.constraints}</p>
                  )}
                  {field.description && (
                    <p className="fieldDescription">{field.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}

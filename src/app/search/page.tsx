import "./page.css"

export default function Search() {
    return (
      <>
        <div className="search">
          <input type="text" placeholder="Procurar chamado"/>

          <button type="submit">Buscar</button>
        </div>
      </>
    );
  }
import "./styles/Main.css"

function Main(props) {
  return (
    <div className="cont">
        {props.children}
    </div>
  )
}

export default Main
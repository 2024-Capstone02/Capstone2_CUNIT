import "./Btn.css"

const Btn = ({ text, type, onClick}) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    return (
      <button
        className={["Btn", `Btn_${btnType}`].join(" ")}
        onClick={onClick}
        >
        {text}
        </button>
    );
};

Btn.defaultProps = {
    type: "default",
};

export default Btn;
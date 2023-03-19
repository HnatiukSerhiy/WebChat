import './Input.css';

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src="" alt="" />
        {/* <input type="text" style={{display: "none"}} /> */}
      <button>Send</button>
      </div>
    </div>
  );
};

export default Input;

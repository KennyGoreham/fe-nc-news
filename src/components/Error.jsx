const Error = (props) => {

    const { status, message } = props;

    return (
        <div className="error-info">
            <p id="oops-message">Oops, something went wrong!</p>
            <h3 id="status-code-heading">{status}</h3>
            <p id="error-message">{message}</p>
        </div>
    )
}

export default Error;
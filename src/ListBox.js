export const ListBox = ({children, onIsOpen1, classOpen}) => {
    return (
    <div className="box">
        <button
          className="btn-toggle"
          onClick={() => onIsOpen1((open) => !open)}
        >
          {classOpen ? "–" : "+"}
        </button>
          {children}
      </div>
    )
}
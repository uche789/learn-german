import "./dropdown.scss";

const dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropdown-link">Hover</button>
      <ul className="dropdown-menu">
        <li className="dropdown-menu-item"><button>dropdown-menu Item</button></li>
        <li className="dropdown-menu-item"><button>dropdown-menu Item</button></li>
        <li className="dropdown-menu-item"><button>dropdown-menu Item</button></li>
      </ul>
    </div>)
}

export default dropdown;
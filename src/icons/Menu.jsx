export const MenuIcon = ({ handleClick }) => {
  return (
    <div className="menuItens" onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="16"
          height="3"
          rx="1.5"
          transform="matrix(-1 0 0 1 23.9999 5)"
          fill="white"
        />
        <rect
          width="24"
          height="3"
          rx="1.5"
          transform="matrix(-1 0 0 1 23.9999 11)"
          fill="white"
        />
        <rect
          width="8"
          height="3"
          rx="1.5"
          transform="matrix(-1 0 0 1 23.9999 17)"
          fill="white"
        />
      </svg>
    </div>
  );
};

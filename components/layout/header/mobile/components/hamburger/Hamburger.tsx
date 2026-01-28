import MenuButton from './components/menu-button/MenuButton';
import MenuPanel from './components/menu-panel/MenuPanel';
import {useState} from 'react';

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const btnClick = (bool: boolean) => {
    setIsOpen(bool);
  }

  return (
    <div>
      <MenuButton onClick={btnClick} />
      <MenuPanel onClick={btnClick} />
    </div>
  )
}
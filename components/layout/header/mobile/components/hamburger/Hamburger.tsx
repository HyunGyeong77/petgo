import MenuButton from './components/menu-button/MenuButton';
import {useState} from 'react';

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const btnClick = (bool: boolean) => {
    setIsOpen(bool);
  }

  return (
    <div>
      <MenuButton onClick={btnClick} />
    </div>
  )
}
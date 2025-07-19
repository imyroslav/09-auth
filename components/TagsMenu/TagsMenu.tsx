'use client';

import css from './TagsMenu.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { tags } from "../../app/constants/constants"


export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href="/notes/filter/all" className={css.menuLink} onClick={() => setIsOpen(false)}>
              All notes
            </Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(false)}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
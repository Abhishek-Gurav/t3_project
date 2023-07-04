import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import logo from '../Images/Logo.jpeg';
import styles from '../styles/navbar.module.css';

export default function NavScrollExample() {

  return (
    <Navbar className={styles.nav_main} expand="lg">
      <Container fluid className={styles.flex} >
        <Navbar.Brand  href="/">
         <div className="flex">
          <Image
            src={logo}
            width={35}
            height={35}
            className="d-inline-block align-top logo"
            alt="Filter Pic"
          />{' '}
          <span className={styles.nav_head}>Filter Cam</span>
          </div> 
        </Navbar.Brand>
        <div className='flex justify-content-between'>
        <Navbar.Collapse className={styles.Nav_c} id="navbarScroll">
          <Nav style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link className={styles.nav_link} href="/ghostmask">
              Ghostmask
            </Nav.Link>
            <Nav.Link className={styles.nav_link} href="/hand">
              Hand-Tattoo
            </Nav.Link>
            <Nav.Link className={styles.nav_link} href="/lipstick">
              Lipstick
            </Nav.Link>
            <Nav.Link className={styles.nav_link} href="/nlp">
              Text Analyzer
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <span className='ml-4'>
        <UserButton />
        </span>
        </div>
      </Container>
    </Navbar>
  );
}

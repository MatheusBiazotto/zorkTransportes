"use client";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Sobre nós",
      href: "#",
    },
    {
      label: "Contato",
      href: "#",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ];

  return (
    <Navbar
      style={{ backgroundColor: "transparent" }}
      className="border-gray-500"
      onMenuOpenChange={setIsMenuOpen}
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img
            width={100}
            className="rounded-small"
            src="https://upload.wikimedia.org/wikipedia/commons/6/67/Imagem_Logo_Completo_Azul.png"
            alt=""
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-white" href="/">
            Início
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-white">
            Sobre nós
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Contato
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/buscar" variant="flat">
            Rastrear Pedido
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="/admin">Admin</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu style={{ backgroundColor: "transparent" }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full text-white" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.nodePackages_latest.vercel
    pkgs.nodePackages_latest.typescript

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
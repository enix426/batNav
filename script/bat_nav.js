"use strict";

const DIM = 5; // Dimension de la grille
const ESPACE = ' ';
const CASE_VIDE = 0; // Case vide (sans bateau, sans tir dans l'eau)
const DANS_EAU = -Infinity; // Case tir dans l'eau


/**
 * Les cases avec les valeurs possibles:
 *   0 (CASE_VIDE): case sans bateau
 *   1,2,3,...: case du bateau contenant le numéro du bateau
 *   -1,-2,-3,...: case du bateau touchée
 *   -Infinity (DANS_EAU): case tire dans l'eau
 */

let cases = []; // Les valeurs des cases (tableau de DIM*DIM cases)

// Lire valeur d'une case à partir des indices ligne et colonne
function get_case(l,c) {
    return cases[l*DIM+c];
}

// Écrire valeur d'une case à partir l,c
function set_case(l,c,v) {
    cases[l*DIM+c] = v;
}

/**
 * Initialiser la grille
 */
cases = [];
for (let i=0 ; i < DIM*DIM ; i++ ) {
    cases[i] = CASE_VIDE;
}

/**
 * Placer des bateaux fixes sur la grille initiale
 */
// Un bateau de deux cases en ligne 1, colonnes 0 et 1
set_case(1,0, 1);
set_case(1,1, 1);
// Un bateau de trois cases en colonne 4, lignes 3 à 5
// set_case(2,4, 2);
// set_case(3,4, 2);
// set_case(4,4, 2);
// Un bateau de deux cases en ligne 2, colonnes 1 et 2
// set_case(2,1, 3);
// set_case(2,2, 3);

/**
 * Afficher la grille dans la console
 */
function afficher(reveler = false) {
    console.group("grille");
    // Ligne en-tête (numéros de colonnes)
    let ligne_entete = ESPACE.repeat(5);
    for (let c = 0; c < DIM; c++) {
        ligne_entete+= c+ESPACE.repeat(2);
    }
    console.log(ligne_entete);
    for (let l = 0 ; l < DIM ; l++ ) {
        let ligne = l + ESPACE.repeat(2); // Chaîne représentant la ligne
        for (let c = 0; c < DIM; c++) {
            // Valeur de la case
            let val = get_case(l,c);
            let symbole = '.';
            if (reveler) {
                symbole = val===DANS_EAU ? '*' : String(val);
            } else {
                if (DANS_EAU === val) {
                    symbole = '*';
                } else if (val < 0) {
                    symbole = 'X';
                }
            }
            ligne += symbole.padStart(3, ESPACE);
        }
        console.log(ligne);
    }
    console.groupEnd();
}

/**
 * Faire un tir sur la ligne l et la colonne c
 */
function tirer(l, c) {
    console.log(`tirer en (${l}, ${c})`);
    let res = ''; // La chaîne résultat
    let val = get_case(l,c);
    if (CASE_VIDE === val) {
        set_case(l,c,DANS_EAU);
        res = "Dans l'eau !";
    } else if (val > 0) {
        // Changer son signe en négatif
        set_case(l, c, -val);
        res = "Touché !";
        if (est_fini()) {
            res += "\nPartie terminée !";
        }
    } else if (val < 0) {
        res = "Déjà Touché !";
    } else if (DANS_EAU === val) {
        res = "Déjà dans l'eau !";
    }
    console.log("Résultat du tir : ", res);
    afficher();
}


/**
 * Déterminer si le jeu est terminé
 */
function est_fini() {
    // La partie est finie s'il n'y a aucune valeur >0 dans le tableau 
    let i=0;
    while ((i < cases.length) && (cases[i]<=0) ) {
        i++;
    }
    return (i === cases.length);
}
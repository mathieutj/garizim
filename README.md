# Garizim | Restaurant & Commande en Ligne

**Garizim** est une plateforme web moderne dédiée à la gastronomie authentique. Ce projet propose une expérience d'achat simplifiée ("Direct Pay") avec une intégration complète des paiements mobiles locaux et une gestion logistique via WhatsApp.

---

## Fonctionnalités principales

### Paiement Direct (Instant Checkout)

Fini les paniers complexes. Chaque plat dispose de son propre bouton de paiement rapide, réduisant le parcours client à deux clics pour une conversion maximale.

### Intégration FedaPay

Le site accepte les paiements sécurisés via :

* **Mobile Money** (MTN, Moov, Celtiis) au Bénin et dans la sous-région.
* **Cartes Bancaires** (Visa, MasterCard).

### Notification Automatisée WhatsApp

Dès la validation du paiement, le client est redirigé vers WhatsApp avec un message pré-rempli contenant :

* L'identifiant unique de la transaction.
* Le détail du plat commandé.
* Le montant total et l'heure de la commande.

### Filtres de Catégories

Une interface fluide permettant de naviguer instantanément entre les **Entrées**, les **Plats de Résistance** et les **Boissons** grâce à une logique JavaScript optimisée.

---

## 🛠️ Stack Technique

* **Langages :** HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
* **Typographie :** *Playfair Display* & *Poppins* via Google Fonts.
* **Passerelle de Paiement :** SDK FedaCheckout (FedaPay).
* **Communication :** API WhatsApp Business (Lien de redirection structuré).
* **Images :** Hébergées sur Postimages pour une performance optimale.

---

## Aperçu du Message Cuisine (WhatsApp)

> **NOUVELLE COMMANDE PAYÉE** 🔔
> **Commande :** #ORD-FEDA-9988
> **Client :** [Nom à préciser]
> **DÉTAILS :** 1x Carpe Grillée Spéciale (6.000 FCFA)
> **TOTAL :** 6.000 FCFA
> **Paiement :** Confirmé via FedaPay
> **Heure :** 12:45

---

## 🛡️ Sécurité

Toutes les transactions sont traitées via les serveurs sécurisés de FedaPay, garantissant la protection des données financières des clients.

---

**Développé par Merlone avec passion pour l'art culinaire.**

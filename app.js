// CONFIGURATION DU RESTAURANT
const CONFIG = {
    restaurantName: "Garizim",
    whatsappManager: "229XXXXXXXX", // Numéro qui reçoit les commandes (ex: 22997000000)
    fedaPublicKey: "pk_test_VOTRE_CLE", // Remplacez par votre clé FedaPay
};

/**
 * Fonction déclenchée par le bouton "Payer maintenant"
 * @param {string} itemName - Nom du plat
 * @param {number} itemPrice - Prix du plat
 */
function payDirect(itemName, itemPrice) {
    let widget = FedaCheckout.setup({
        public_key: CONFIG.fedaPublicKey,
        transaction: {
            amount: itemPrice,
            description: `Commande : ${itemName}`
        },
        onComplete: function(response) {
            if (response.status === 'approved') {
                // Si le paiement est réussi, on génère les notifications
                sendNotifications(itemName, itemPrice, response.transaction.id);
            } else {
                alert("Le paiement n'a pas été validé. Veuillez réessayer.");
            }
        }
    });
    widget.open();
}

/**
 * Gère l'envoi du message WhatsApp formaté
 */
function sendNotifications(itemName, itemPrice, transactionId) {
    const now = new Date();
    const timeString = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    // MODÈLE 1 : RÉCEPTION CUISINE (Envoyé au manager)
    const messageCuisine = 
        `🔔 *NOUVELLE COMMANDE PAYÉE* 🔔%0A` +
        `🆔 *Commande :* #ORD-${transactionId}%0A` +
        `👤 *Client :* [À REMPLIR SUR WA]%0A` +
        `🛒 *DÉTAILS :*%0A` +
        `- 1x ${itemName} : ${itemPrice.toLocaleString()} FCFA%0A%0A` +
        `💰 *TOTAL : ${itemPrice.toLocaleString()} FCFA*%0A` +
        `💳 *Paiement :* Confirmé (FedaPay)%0A` +
        `🏠 *Adresse :* [À PRÉCISER PAR LE CLIENT]%0A` +
        `🕒 *Heure :* ${timeString}%0A%0A` +
        `_Veuillez confirmer la réception au client._`;

    // Lien WhatsApp vers le manager avec le message de la cuisine
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappManager}?text=${messageCuisine}`;
    
    // Alerte de succès pour le client avant redirection
    alert("✅ Paiement réussi ! Vous allez être redirigé vers notre service client WhatsApp pour finaliser votre livraison.");

    // Redirection vers WhatsApp
    window.location.href = whatsappUrl;
}

// ==========================================
// GESTION DES FILTRES DE CATÉGORIES
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodCards = document.querySelectorAll('.food-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Gérer l'apparence des boutons (couleur orange)
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            // 2. Récupérer la catégorie sélectionnée
            const selectedCategory = button.getAttribute('data-category');

            // 3. Filtrer les cartes
            foodCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block'; // Montrer
                    // Petit effet d'animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none'; // Cacher
                }
            });
        });
    });
});
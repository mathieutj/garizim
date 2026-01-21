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
let currentOrder = {}; // Stockage temporaire

function payDirect(name, price) {
    currentOrder = { name, price };
    document.getElementById('selected-item-name').innerText = name + " - " + price.toLocaleString() + " F";
    document.getElementById('delivery-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('delivery-modal').style.display = 'none';
}

// Gestion de la soumission du formulaire
document.getElementById('delivery-form').addEventListener('submit', function(e) {
    e.preventDefault();
    closeModal();
    
    // On lance FedaPay avec les infos enregistrées
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;

    startFedaPay(name, phone, address);
});

function startFedaPay(clientName, clientPhone, clientAddress) {
    let widget = FedaCheckout.setup({
        public_key: CONFIG.fedaPublicKey,
        transaction: {
            amount: currentOrder.price,
            description: `Commande ${currentOrder.name} - ${clientName}`
        },
        onComplete: function(response) {
            if (response.status === 'approved') {
                sendFinalWhatsApp(clientName, clientPhone, clientAddress, response.transaction.id);
            }
        }
    });
    widget.open();
}

function sendFinalWhatsApp(name, phone, address, transId) {
    const message = 
        `🔔 *NOUVELLE COMMANDE PAYÉE* 🔔%0A` +
        `🆔 *Commande :* #ORD-${transId}%0A` +
        `👤 *Client :* ${name}%0A` +
        `📞 *Contact :* ${phone}%0A` +
        `🏠 *Adresse :* ${address}%0A` +
        `🛒 *DÉTAIL :* 1x ${currentOrder.name}%0A` +
        `💰 *TOTAL :* ${currentOrder.price.toLocaleString()} FCFA%0A` +
        `💳 *Paiement :* Confirmé (FedaPay)`;

    window.location.href = `https://wa.me/${CONFIG.whatsappManager}?text=${message}`;
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

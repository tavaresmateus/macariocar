// Animação suave do scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação do header ao rolar a página
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Contador regressivo
function updateCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    let hours = parseInt(hoursElement.textContent);
    let minutes = parseInt(minutesElement.textContent);
    let seconds = parseInt(secondsElement.textContent);
    
    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else {
            minutes = 59;
            if (hours > 0) {
                hours--;
            } else {
                // Reinicia o contador para 4 horas
                hours = 4;
                minutes = 0;
                seconds = 0;
            }
        }
    }
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function updatePopupTimer() {
    const hoursElement = document.getElementById('popupHours');
    const minutesElement = document.getElementById('popupMinutes');
    const secondsElement = document.getElementById('popupSeconds');
    
    let hours = parseInt(hoursElement.textContent);
    let minutes = parseInt(minutesElement.textContent);
    let seconds = parseInt(secondsElement.textContent);
    
    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else {
            minutes = 59;
            if (hours > 0) {
                hours--;
            } else {
                // Reinicia o contador para 2 horas e 30 minutos
                hours = 2;
                minutes = 30;
                seconds = 0;
            }
        }
    }
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Atualiza os contadores a cada segundo
setInterval(updateCountdown, 1000);
setInterval(updatePopupTimer, 1000);

// Inicia o contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    hoursElement.textContent = '12'.toString().padStart(2, '0');
    minutesElement.textContent = '00'.toString().padStart(2, '0');
    secondsElement.textContent = '00'.toString().padStart(2, '0');
});

// Controle do Pop-up
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('offerPopup');
    const closeBtn = document.querySelector('.close-popup');
    
    // Mostra o pop-up após 30 segundos
    setTimeout(() => {
        popup.style.display = 'block';
    }, 30000);
    
    // Fecha o pop-up ao clicar no X
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
    
    // Fecha o pop-up ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Dados do formulário:', data);
    
    // Feedback visual
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    submitButton.style.background = '#28a745';
    
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
        this.reset();
    }, 3000);
});

// Botões de interesse
document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.vehicle-card');
        const vehicleName = card.querySelector('h3').textContent;
        const price = card.querySelector('.new-price').textContent;
        
        // Rolar até o formulário
        document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
        
        // Preencher o select com o modelo
        const modelSelect = document.querySelector('select');
        Array.from(modelSelect.options).forEach(option => {
            if (option.text.includes(vehicleName)) {
                modelSelect.value = option.value;
            }
        });
    });
});

// Animação dos cards de veículos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.vehicle-card, .benefit-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
});

// Animação para os banners
document.querySelectorAll('.highlight-content, .warranty-content, .schedule-content, .urgency-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
});

// Efeito de hover nos CTAs
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// FAQ Interativo
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todos os itens
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
        });
        
        // Abre o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Animação para as novas seções
document.querySelectorAll('.service-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
});

// Função para animar botões com efeito pulse
function addPulseEffect() {
    const pulseButtons = document.querySelectorAll('.pulse');
    pulseButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.5)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
    });
}

// Inicializa os efeitos quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    addPulseEffect();
});

// Base JS placeholder


// ===== Original JS from your file (kept intact) =====

        // Page Navigation
        function showPage(pageId) {
            const pages = document.querySelectorAll('.page');
            const buttons = document.querySelectorAll('nav button');
            
            // Check admin access
            if (pageId === 'admin' && !isAdmin) {
                alert('Admin access required');
                return;
            }
            
            pages.forEach(page => page.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            buttons.forEach(btn => {
                if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(pageId)) {
                    btn.classList.add('active');
                }
            });
        }

        // User Authentication
        let currentUser = null;
        let isAdmin = false;

        function showLoginModal() {
            document.getElementById('loginModal').classList.add('active');
        }

        function closeLoginModal() {
            document.getElementById('loginModal').classList.remove('active');
        }

        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            
            if (username.toLowerCase() === 'admin') {
                loginAsAdmin(username);
            } else {
                loginAsUser(username);
            }
            
            closeLoginModal();
        }

        function loginAsUser(username) {
            currentUser = {
                name: username,
                email: username + '@example.com',
                isAdmin: false
            };
            updateUI(currentUser);
        }

        function loginAsAdmin(username) {
            currentUser = {
                name: username,
                email: username + '@example.com',
                isAdmin: true
            };
            isAdmin = true;
            updateUI(currentUser);
            
            // Show admin options
            document.getElementById('adminLink').style.display = 'block';
            document.getElementById('adminDivider').style.display = 'block';
        }

        function updateUI(user) {
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('userProfile').style.display = 'block';
            
            const initial = user.name.charAt(0).toUpperCase();
            document.getElementById('userInitial').textContent = initial;
            document.getElementById('dropdownInitial').textContent = initial;
            document.getElementById('dropdownName').textContent = user.name;
            document.getElementById('dropdownEmail').textContent = user.email;
        }

        function toggleProfileMenu() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('active');
        }

        function closeProfileMenu() {
            document.getElementById('profileDropdown').classList.remove('active');
        }

        function logout() {
            currentUser = null;
            isAdmin = false;
            document.getElementById('loginBtn').style.display = 'block';
            document.getElementById('userProfile').style.display = 'none';
            document.getElementById('adminLink').style.display = 'none';
            document.getElementById('adminDivider').style.display = 'none';
            closeProfileMenu();
            showPage('home');
        }

        // Click outside to close dropdown
        document.addEventListener('click', function(event) {
            const userProfile = document.getElementById('userProfile');
            const dropdown = document.getElementById('profileDropdown');
            
            if (userProfile && !userProfile.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Form Submissions
        document.getElementById('quickRegForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration successful! Check your email for confirmation.');
            this.reset();
        });

        document.getElementById('createEventForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Event created successfully!');
            this.reset();
        });

        // Initialize top drivers
        function loadTopDrivers() {
            const topDrivers = [
                { rank: 1, name: 'DriftKing_99', points: 2450, wins: 18, losses: 2 },
                { rank: 2, name: 'SideWays_Pro', points: 2280, wins: 16, losses: 4 },
                { rank: 3, name: 'TougeHero', points: 2100, wins: 15, losses: 5 }
            ];

            const container = document.getElementById('topDriversList');
            if (container) {
                container.innerHTML = topDrivers.map(driver => `
                    <div class="leaderboard-item">
                        <span class="rank rank-${driver.rank}">#${driver.rank}</span>
                        <div class="driver-info">
                            <div class="driver-name">${driver.name}</div>
                            <div class="driver-stats">W: ${driver.wins} • L: ${driver.losses}</div>
                        </div>
                        <div class="points">${driver.points}</div>
                    </div>
                `).join('');
            }
        }

        // Profile Tab Navigation
        function showProfileTab(tabId) {
            const tabs = document.querySelectorAll('.profile-tab');
            const navItems = document.querySelectorAll('.settings-nav-item');
            
            tabs.forEach(tab => tab.style.display = 'none');
            navItems.forEach(item => item.classList.remove('active'));
            
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.style.display = 'block';
            }
            
            event.target.closest('.settings-nav-item').classList.add('active');
        }

        // Avatar Upload
        function handleAvatarUpload(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatarImage = document.getElementById('avatarImage');
                    const avatarInitial = document.getElementById('avatarInitial');
                    avatarImage.src = e.target.result;
                    avatarImage.style.display = 'block';
                    avatarInitial.style.display = 'none';
                    
                    // Update small avatar in header
                    const userAvatar = document.querySelector('.user-avatar');
                    if (userAvatar) {
                        userAvatar.style.backgroundImage = `url(${e.target.result})`;
                        userAvatar.style.backgroundSize = 'cover';
                        document.getElementById('userInitial').style.display = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        }

        function removeAvatar() {
            document.getElementById('avatarImage').style.display = 'none';
            document.getElementById('avatarInitial').style.display = 'flex';
            document.getElementById('avatarInput').value = '';
            
            // Reset header avatar
            const userAvatar = document.querySelector('.user-avatar');
            if (userAvatar) {
                userAvatar.style.backgroundImage = '';
                document.getElementById('userInitial').style.display = 'block';
            }
        }

        // Password Strength Checker
        document.getElementById('newPassword')?.addEventListener('input', function(e) {
            const password = e.target.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            if (password.length === 0) {
                strengthBar.className = 'password-strength-fill';
                strengthText.textContent = 'Enter a password';
                return;
            }
            
            let strength = 0;
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            if (strength <= 1) {
                strengthBar.className = 'password-strength-fill weak';
                strengthText.textContent = 'Weak password';
            } else if (strength === 2) {
                strengthBar.className = 'password-strength-fill medium';
                strengthText.textContent = 'Medium strength';
            } else {
                strengthBar.className = 'password-strength-fill strong';
                strengthText.textContent = 'Strong password';
            }
        });

        // Payment Modal
        function showAddPaymentModal() {
            document.getElementById('paymentModal').classList.add('active');
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').classList.remove('active');
        }

        // Card Number Formatting
        document.getElementById('cardNumber')?.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Expiry Date Formatting
        document.getElementById('cardExpiry')?.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // Form Submissions for Profile
        document.getElementById('profileInfoForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile information updated successfully!');
        });

        document.getElementById('passwordResetForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Password updated successfully!');
            this.reset();
        });

        document.getElementById('billingForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Billing information saved!');
        });

        document.getElementById('addPaymentForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment method added successfully!');
            closePaymentModal();
            this.reset();
        });

        document.getElementById('preferencesForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Preferences saved!');
        });

        document.getElementById('notificationsForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Notification settings updated!');
        });

        // Initialize everything on load
        document.addEventListener('DOMContentLoaded', function() {
            loadTopDrivers();
            
            // Set initial avatar letter
            const avatarInitial = document.getElementById('avatarInitial');
            if (avatarInitial && currentUser) {
                avatarInitial.textContent = currentUser.name.charAt(0).toUpperCase();
            }
        });
    
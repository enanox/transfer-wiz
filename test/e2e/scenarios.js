"use strict";

describe("TransferWiz App", function() {
	
	describe("Routes Test", function() {
		var token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('/');
		});		
		
		/*afterEach(function() {
			for(var i = 0; i < sessionStorage.length; i++)  {
				sessionStorage.removeItem(sessionStorage.key(i));
			}
		});*/ 
		
		it('should jump to the /transfer path when the user access to / ', function() {
			browser().navigateTo('#/');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should have a working /transfer/origin path', function() {
			browser().navigateTo('#/transfer/origin');
			expect(browser().location().path()).toBe('/transfer/origin');
		});
		
		it('should navigate to /transfer when forced navigation to /transfer/destination path', function() {
			browser().navigateTo('#/transfer/destination');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should navigate to /transfer/destination using the generated token', function() {
			browser().navigateTo('#/transfer/destination/'+token);
			expect(browser().location().path()).toBe('/transfer/destination/'+token);
		});
		
		it('should navigate to /transfer when forced navigation to /transfer/amount page', function() {
			browser().navigateTo('#/transfer/amount');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should navigate to /transfer/amount using the generated token', function() {
			browser().navigateTo('#/transfer/amount/'+token);
			expect(browser().location().path()).toBe('/transfer/amount/'+token);
		});
		
		it('should navigate to /transfer when forced navigation to /transfer/confirm page', function() {
			browser().navigateTo('#/transfer/confirm');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should navigate to /transfer/confirm using the generated token', function() {
			browser().navigateTo('#/transfer/confirm/'+token);
			expect(browser().location().path()).toBe('/transfer/confirm/'+token);
		});
		
		it('should navigate to /transfer when forced navigation to /transfer/success page', function() {
			browser().navigateTo('#/transfer/success');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should navigate to /transfer/success using the generated token', function() {
			browser().navigateTo('#/transfer/success/'+token);
			expect(browser().location().path()).toBe('/transfer/success/'+token);
		});
	});
	
	describe("Transfer Start page", function() {
		var authCtrl, scope;
				
		beforeEach(function() {
			browser().navigateTo('#/transfer');
		});
		
		it('should have the user account logged', function() {
			//var userData = {name: 'Mathias Juan Rodriguez Martinez'};
			//console.log(userData.name)
			//expect(userData).toBeTruthy();
			//expect(userData.name).toBe('Mathias Juan Rodriguez Martinez');
		});
		
		it('should navigate to Step 1 page', function() {
			var transferButton = element('#transfer');
			transferButton.click();
			
			expect(browser().location().path()).toBe('/transfer/origin');
		});
		
		it('should display user data in the Start page', function() {
			/*authCtrl = $controller('AuthCtrl');*/
			
			//var userData = authCtrl.getAuthenticatedUser();
			var userData = {'name': 'Mathias Juan Rodriguez Martinez'};
			//expect(userData).toBeTruthy();
			expect(element('#userName').text()).toBe(userData.name);
		});
	});
	
	describe("Transfer Step 1", function() {
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/origin');
		});
				
		it('should have selectable accounts to start the transfer', function() {
			
			expect(repeater('tr.accounts').count()).not().toBe(0);
			
		});
		
		it('should navigate to Step 2 page after clicking on "Next" button', function() {
			element('#accounts0').click();
			sleep(1);
			element('#next').click();
			sleep(5);

			var token = '';
			
			for(var i = sessionStorage.length; i > 0 ; i--) {
				if(sessionStorage[sessionStorage.key(i)] !== undefined && sessionStorage[sessionStorage.key(i)] !== 'undefined')  {
					var lk = sessionStorage.key(i).split('-');
					
					if(lk[lk.length - 1] == 'origin')  {
						token = lk[0]+'-'+lk[1];
					} 
				}
			}
			
			expect(input('accountSelected.number').val()).toEqual('0030 4411 123 4567890');
			expect(browser().location().path()).toBe('/transfer/destination/'+token);
			
		});
		
		it('should go back to /transfer when clicking on cancel button', function() {
			var cancelButton = element('#cancel');
			cancelButton.click();
			
			expect(browser().location().path()).toBe('/transfer');
		});
	});
	
	describe("Transfer Step 2", function() {
		
		var token = '';
		
		beforeEach(function() {
			token = 'tw-key'+(new Date().getTime());
			
			browser().navigateTo('#/transfer/destination/'+token);
		});
	
		it('should have selectable destination accounts', function() {
			expect(repeater('tr.accounts').count()).not().toBe(0);
		});
		
		it('should navigate to Step 3 page after clicking on "Next" button', function() {
			element('#accounts0').click();
			sleep(1);
			element('#next').click();
			sleep(5);
			
			var lastKeys = sessionStorage.key(sessionStorage.length - 1).split('-');
			var lastToken = lastKeys[0]+'-'+lastKeys[1];
			console.log(lastKeys, lastToken)
			sleep(5);
			expect(browser().location().path()).toBe('/transfer/amount/'+lastToken);
		});
	});
	
	describe("Transfer Step 3", function() {
		var step3Token = 'twkey-'+(new Date().getTime());
		
		beforeEach(function() {
			console.log(sessionStorage.length, sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1)))
			browser().navigateTo('#/transfer/amount/'+step3Token);
		});
		
		it('should enter amount for the transfer', function()  {
			input('amount.value').enter('1500.00');
			expect(input('amount.value').val()).toBe('1500.00');
		});
		
		it('should enter e-mail for the transfer', function()  {
			input('amount.email').enter('some@local');
			expect(input('amount.email').val()).toBe('some@local');
		});
		
		it('should navigate to Step 4 page after clicking on "Next" button', function() {
			input('amount.value').enter('1500.00');
			expect(input('amount.value').val()).toBe('1500.00');
			
			input('amount.email').enter('some@local');
			expect(input('amount.email').val()).toBe('some@local');
			
			element('#next').click();
			sleep(5);

			var lastKeys = sessionStorage.key(sessionStorage.length - 1).split('-');
			var lastToken = lastKeys[0]+'-'+lastKeys[1];
			pause();
			expect(browser().location().path()).toBe('/transfer/confirm/'+lastToken);
		});
		
	});
	
	describe("Transfer Step 4", function() {
		var token = 'twkey-'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/confirm/'+token);
		});
		
		it('should display accounts information and amount', function() {
			var originAccount = element('#originAccount');
			var destinationAccount = element('#destinationAccount');
			var amountTransfer = element('#amount');
			var email = element('#email');
			var comments = element('#comments');
			
			expect(originAccount.text()).toBe('0021 1124 1122334455');
			expect(destinationAccount.text()).toBe('0021 1124 6677889900');
			expect(amountTransfer.text()).toBe('1500.00');
			expect(email.text()).toBe('some@local');
			expect(comments.text()).toBe('Comments');
		});
		
		it('should navigate to Step 5 page after clicking on "Next" button', function() {
			element('#next').click(); 
			pause();
			expect(browser().location().path()).toBe('/transfer/success/'+token);
		});
	});
		
	describe("Transfer Step 5", function() {
		var token = 'twkey-'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/success/'+token);
		});
		
		it('should navigate to /transfer page when clicking button "Home"', function() {
			
			element('#home').click();
			
			expect(browser().location().path()).toBe('/transfer');
		});
		
	});
	
	describe("Full Step Transfer", function() {
		beforeEach(function() {
			
		});
		
		it('should navigate to Step 1', function(){
			browser().navigateTo('#/transfer');
			
			element('#transfer').click();
			expect(browser().location().path()).toBe('/transfer/origin');
		});
		
		it('should pick an account and navigate to Step 2', function() {
			element('#accounts0').click();			
			sleep(1);
			console.log(input('accountSelected.number').val(), 'value?')
			element("#next").click();			
			sleep(5);

			var token = '';
			
			for(var i = sessionStorage.length; i > 0 ; i--) {
				if(sessionStorage[sessionStorage.key(i)] !== undefined && sessionStorage[sessionStorage.key(i)] !== 'undefined')  {
					var lk = sessionStorage.key(i).split('-');

					if(lk[lk.length - 1] == 'origin')  {
						token = lk[0]+'-'+lk[1];
					} 
				}
			}
			
			console.log('origin account',originAccount, token)
			pause();
			expect(input('accountSelected.number').val()).toBe('0030 4411 123 4567890');
			expect(browser().location().path()).toBe('/transfer/destination/'+token);
		});
		
		it('should pick a destination account and navigate to Step 3', function() {
			element('#accounts0').click();
			element("#next").click();
			sleep(5);
			var destinationAccountSaved = sessionStorage.key(sessionStorage.length - 1);
			var token = 'twkey-' + destinationAccountSaved.split('-')[1];
			var destinationAccount = sessionStorage.getItem(destinationAccountSaved + '-destination');
			console.log('destination account',destinationAccount)
			pause();
			expect({value: destinationAccount}).toBe('0030 4411 123 4567890');
			expect(browser().location().path()).toBe('/transfer/destination/'+token);
		});
		
		it('should enter amount value, mail and comments and navigate to Step 4', function() {
			
		});
		
		it('should confirm the transfer and show success message', function() {
			
		});
	});
});
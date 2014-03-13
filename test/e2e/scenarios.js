"use strict";

describe("TransferWiz App", function() {
	
	beforeEach(function() {
		browser().navigateTo('/');
	});
	
	describe("Routes Test", function() {
		var token = 'tw-key'+(new Date().getTime());
		
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
		
		var step1Token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/origin');
		});
		
		it('should have selectable accounts to start the transfer', function() {
			
			expect(repeater('tr.accounts').count()).not().toBe(0);
			
		});
		
		it('should navigate to Step 2 page after clicking on "Next" button', function() {
			var firstAccount = element('input[name="accounts"]:first-child');
			firstAccount.click();
			
			element('#next').click();
			console.log(sessionStorage);
			expect(browser().location().path()).toBe('/transfer/destination/'+step1Token);
		});
		
		it('should go back to /transfer when clicking on cancel button', function() {
			var cancelButton = element('#cancel');
			cancelButton.click();

			expect(browser().location().path()).toBe('/transfer');
		});
	});
	
	describe("Transfer Step 2", function() {
		
		var token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/destination/'+token);
		});
	
		it('should have selectable destination accounts', function() {
			expect(repeater('tr.accounts').count()).not().toBe(0);
		});
		
		it('should navigate to Step 3 page after clicking on "Next" button', function() {
			element('#next').click();
			
			expect(browser().location().path()).toBe('/transfer/amount/'+token);
		});
	});
	
	describe("Transfer Step 3", function() {
		var step3Token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/amount/'+step3Token);
		});
		
		it('should enter amount for the transfer', function()  {
			var amountEntered = binding('amount.value');
			
			input('amount.value').enter('1500.00');
			expect(amountEntered).toBe('1500.00');
		});
		
		it('should enter e-mail for the transfer', function()  {
			var amountEntered = binding('amount.email');
			
			input('amount.value').enter('some@local');
			expect(amountEntered).toBe('some@local');
		});
		
		it('should navigate to Step 4 page after clicking on "Next" button', function() {
			input('amount.value').enter('1500.00');
			input('amount.email').enter('some@local');
			
			element('#next').click();
			expect(browser().location().path()).toBe('/transfer/confirm/'+step3Token);
		});
		
	});
	
	describe("Transfer Step 4", function() {
		var token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/confirm/'+token);
		});
		
		it('should display accounts information and amount', function() {
			var originAccount = element('#account-origin');
			var destinationAccount = element('#account-destination');
			var amountTransfer = element('#transfer-amount');
			
			expect(originAccount.text()).toBe('0021 1124 1122334455');
			expect(destinationAccount.text()).toBe('0021 1124 6677889900');
			expect(amountTransfer.text()).toBe('1500.00');
		});
		
		it('should navigate to Step 5 page after clicking on "Next" button', function() {
			element('#next').click(); 
			
			expect(browser().location().path()).toBe('/transfer/success/'+token);
		});
	});
		
	describe("Transfer Step 5", function() {
		var token = 'tw-key'+(new Date().getTime());
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/success/'+token);
		});
		
		it('should display accounts information and amount', function() {
			var originAccount = element('#account-origin');
			var destinationAccount = element('#account-destination');
			var amountTransfer = element('#transfer-amount');
			
			expect(originAccount.text()).toBe('0021 1124 1122334455');
			expect(destinationAccount.text()).toBe('0021 1124 6677889900');
			expect(amountTransfer.text()).toBe('1500.00');
		});
		
	});
	
});
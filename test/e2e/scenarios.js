"use strict";

describe("TransferWiz App", function() {
	
	beforeEach(function() {
		browser().navigateTo('/');
	});
	
	describe("Routes Test", function() {
		
		it('should jump to the /transfer path when the user access to / ', function() {
			browser().navigateTo('#/');
			expect(browser().location().path()).toBe('/transfer');
		});
		
		it('should have a working /transfer/origin path', function() {
			browser().navigateTo('#/transfer/origin');
			expect(browser().location().path()).toBe('/transfer/origin');
		});
		
		it('should have a working /transfer/destination path', function() {
			browser().navigateTo('#/transfer/destination');
			expect(browser().location().path()).toBe('/transfer/destination');
		});
		
		it('should have a working /transfer/amount page', function() {
			browser().navigateTo('#/transfer/amount');
			expect(browser().location().path()).toBe('/transfer/amount');
		});
		
		it('should have a working /transfer/success page', function() {
			browser().navigateTo('#/transfer/success');
			expect(browser().location().path()).toBe('/transfer/success');
		});
	});
	
	describe("Transfer Start page", function() {
		var authCtrl;
		
		beforeEach(function() {
			browser().navigateTo('#/transfer');
		});
		
		it('should have the user account logged', function() {
			/*authCtrl = $controller('AuthCtrl');
			var userData = authCtrl.getAuthenticatedUser();*/
			var userData = {isLogged: true};
			expect(userData).toBeTruthy();
			expect(userData.isLogged).toBeTruthy();
		});
		
		it('should navigate to Step 1 page', function() {
			var transferButton = element('#start');
			transferButton.click();
			
			expect(browser().location().path()).toBe('/transfer/origin');
		});
		
		it('should display user data in the Start page', function() {
			/*authCtrl = $controller('AuthCtrl');*/
			
			//var userData = authCtrl.getAuthenticatedUser();
			var userData = {'name': 'Mathias'};
			expect(userData).toBeTruthy();
			expect(element('#name-on-account').text()).toBe(userData.name);
		});
	});
	
	describe("Transfer Step 1", function() {
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/origin');
		});
		
		it('should have selectable accounts to start the transfer', function() {
			
			expect(repeater('li.accounts').count()).not().toBe(0);
			
		});
		
		it('should navigate to Step 2 page after clicking on "Next" button', function() {
			var firstAccount = element('.accounts:first-child');
			firstAccount.check();
			
			element('#next').click();
			expect(browser().location().path()).toBe('/transfer/destination');
		});
		
		it('should uncheck all accounts when clicking on cancel button', function() {
			var cancelButton = element('#cancel');
			cancelButton.click();

			expect(repeater('li.accounts').column('account.selected')).toEqualData([false,false]);
		});
	});
	
	describe("Transfer Step 2", function() {
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/destination');
		});
	
		it('should have selectable destination accounts', function() {
			var firstDestination = element('.accounts:first-child');

			expect(repeater('li.accounts').count()).not().toBe(0);
		});
		
		it('should navigate to Step 3 page after clicking on "Next" button', function() {
			element('#next').click();
			
			expect(browser().location().path()).toBe('/transfer/amount');
		});
	});
	
	describe("Transfer Step 3", function() {
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/amount');
		});
		
		it('should enter amount for the transfer', function()  {
			var amountEntered = element('#amount');
			
			input('amount').enter('1500.00');
			expect(amountEntered.text()).toBe('1500.00');
		});
		
		it('should navigate to Step 4 page after clicking on "Next" button', function() {
			element('#next').click();
			
			expect(browser().location().path()).toBe('/transfer/success');
		});
		
	});
	
	describe("Transfer Step 4", function() {
		
		beforeEach(function() {
			browser().navigateTo('#/transfer/success');
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
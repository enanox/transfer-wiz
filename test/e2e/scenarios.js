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
		beforeEach(function() {
			browser().navigateTo('#/transfer');
		});
		
		it('should have the user account logged', function() {
			
		});
		
		it('should navigate to Step 1 page', function() {
			
		});
		
		it('should display user data in the Start page', function() {
			
		});
	});
	
	describe("Transfer Step 1", function() {
		beforeEach(function() {
			browser().navigateTo('#/transfer/origin');
		});
		
		it('should have selectable accounts to make the transfer', function() {
			
		});
		
		it('should navigate to Step 2 page after clicking on confirm button', function() {
			
		});
		
		it('should uncheck all accounts when clicking on cancel button', function() {
			
		});
	});
	
	describe("Transfer Step 2", function() {
		beforeEach(function() {
			browser().navigateTo('#/transfer/origin')
		});
	});
});
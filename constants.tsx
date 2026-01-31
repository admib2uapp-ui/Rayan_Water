
import React from 'react';
import { Customer, Vehicle, Driver, Route } from './types';

export const DRIVER_REMARKS = [
  "House is locked",
  "Already have water",
  "Come tomorrow",
  "Requested additional bottle",
  "Payment pending"
];

const generateCustomers = () => {
  const customers: Customer[] = [
    { id: 'C1', name: 'John Doe Residence', phone: '0712345678', nic: '199012345V', address: '123 Water Lane', lat: 6.9271, lng: 79.8612, routeId: 'R1', waterType: 'Drinking', pricePerUnit: 150, creditAllowed: true, creditLimit: 5000, balance: 450, status: 'Active' },
    { id: 'C2', name: 'Blue Sky Hotel', phone: '0719876543', nic: '198599887V', address: '45 Ocean View', lat: 6.9315, lng: 79.8423, routeId: 'R1', waterType: 'RO', pricePerUnit: 200, creditAllowed: true, creditLimit: 20000, balance: 12500, status: 'Active' },
  ];

  for (let i = 3; i <= 25; i++) {
    customers.push({
      id: `C${i}`,
      name: `Customer Stop #${i}`,
      phone: `07700000${i}`,
      nic: `199${i}112233V`,
      address: `${i * 10} Main St, Sector ${i % 3 === 0 ? 'A' : 'B'}`,
      lat: 6.9271 + (i * 0.001),
      lng: 79.8612 + (i * 0.001),
      routeId: i <= 12 ? 'R1' : 'R2',
      waterType: i % 2 === 0 ? 'Drinking' : 'RO',
      pricePerUnit: 150,
      creditAllowed: true,
      creditLimit: 2000,
      balance: 0,
      status: 'Active'
    });
  }
  return customers;
};

export const MOCK_CUSTOMERS = generateCustomers();

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'V1', number: 'WP-ABC-1234', capacityValue: 2000, capacityUnit: 'Liters', waterTypeAllowed: ['Drinking', 'RO'], assignedDriverId: 'D1', status: 'Active', fuelType: 'Diesel', avgMileage: 12, width: 2.5, height: 3.2 },
  { id: 'V2', number: 'WP-XYZ-5678', capacityValue: 1500, capacityUnit: 'Bottles', waterTypeAllowed: ['Industrial'], assignedDriverId: 'D2', status: 'Active', fuelType: 'Diesel', avgMileage: 10, width: 2.2, height: 2.8 },
];

export const MOCK_DRIVERS: Driver[] = [
  { id: 'D1', name: 'Rayan Fernando', phone: '0755556666', nic: '1988112233', licenseNo: 'L998877', licenseExpiry: '2028-12-01', dailySalary: 2500, commissionPct: 5, status: 'Available' },
  { id: 'D2', name: 'Sunil Perera', phone: '0744443333', nic: '1977443322', licenseNo: 'L112233', licenseExpiry: '2026-05-15', dailySalary: 2200, commissionPct: 3, status: 'On Route' },
];

export const MOCK_ROUTES: Route[] = [
  { id: 'R1', name: 'Coastal Route Alpha', vehicleId: 'V1', driverId: 'D1', customerIds: MOCK_CUSTOMERS.filter(c => c.routeId === 'R1').map(c => c.id) },
  { id: 'R2', name: 'Central Industrial Path', vehicleId: 'V2', driverId: 'D2', customerIds: MOCK_CUSTOMERS.filter(c => c.routeId === 'R2').map(c => c.id) },
];

export const MODULE_CHECKLIST = [
  { id: 1, task: "Core Actors & Auth", status: "Done" },
  { id: 2, task: "Master Data Management (Full)", status: "Done" },
  { id: 3, task: "Route & Load Planning", status: "Done" },
  { id: 4, task: "Distance Sequence logic", status: "Done" },
  { id: 5, task: "Delivery & Collections (Mobile UI)", status: "Done" },
  { id: 6, task: "Finance & Expenses", status: "Done" },
  { id: 7, task: "Live Analytics Dashboard", status: "Done" },
];

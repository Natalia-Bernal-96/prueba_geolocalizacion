"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = calculateDistance;
function calculateDistance(coord1, coord2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = degreesToRadians(coord2.lat - coord1.lat);
    const dLon = degreesToRadians(coord2.lon - coord1.lon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(coord1.lat)) *
            Math.cos(degreesToRadians(coord2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
}
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

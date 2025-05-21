// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-center text-white py-4">
      <p>&copy; {new Date().getFullYear()} Samehadaku Clone. All rights reserved.</p>
    </footer>
  );
}

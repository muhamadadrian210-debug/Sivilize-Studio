export default function TestWhitePage() {
  return (
    <div
      style={{ padding: 40, backgroundColor: '#1e1e2e', minHeight: '100vh' }}
    >
      <h1 style={{ color: 'white', marginBottom: 20 }}>Background Test</h1>

      <div
        style={{
          width: 600,
          minHeight: 400,
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: 40,
          border: '2px solid red',
        }}
      >
        <h2 style={{ color: '#000' }}>
          This should be BLACK text on WHITE paper
        </h2>
        <p style={{ color: '#333' }}>
          If you can read this clearly, inline styles work.
        </p>
      </div>
    </div>
  )
}

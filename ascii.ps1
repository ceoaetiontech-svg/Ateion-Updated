Add-Type -AssemblyName System.Drawing

$files = @("3aab4451afd875f66a83eb26e0ca2d6f58abce98.png", "a440209918fa81a1c528e2e95290d4f1f12546e7.png", "e985b07ea1f916546c05a06ca93558ef62ecc870.png", "eba887f3bcae20b7a5611026256348307e65c2c4.png")
$chars = " .,:;i1tfLCG08@"

foreach ($f in $files) {
    Write-Host "--- $f ---"
    $path = Join-Path "src\assets" $f
    if (Test-Path $path) {
        $img = [System.Drawing.Image]::FromFile((Resolve-Path $path).Path)
        $bmp = new-object System.Drawing.Bitmap $img, 40, 20
        for ($y = 0; $y -lt 20; $y++) {
            $line = ""
            for ($x = 0; $x -lt 40; $x++) {
                $c = $bmp.GetPixel($x, $y)
                $brightness = ($c.R * 0.3 + $c.G * 0.59 + $c.B * 0.11) / 255.0
                $idx = [math]::Floor($brightness * ($chars.Length - 1))
                $line += $chars[$idx] + $chars[$idx]
            }
            Write-Host $line
        }
        $bmp.Dispose()
        $img.Dispose()
    }
}

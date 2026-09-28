param(
    [Parameter(Position = 0)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Không tìm thấy Git. Hãy cài Git và mở lại PowerShell.'
}

$branch = git branch --show-current
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
    throw 'Thư mục hiện tại không nằm trong một nhánh Git.'
}

$upstream = git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($upstream)) {
    throw "Nhánh '$branch' chưa có upstream. Thiết lập upstream trước bằng: git push -u origin $branch"
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host 'Nhập nội dung commit'
}
if ([string]::IsNullOrWhiteSpace($Message)) {
    throw 'Nội dung commit không được để trống.'
}

git add -A
if ($LASTEXITCODE -ne 0) { throw 'git add thất bại.' }

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host 'Không có thay đổi để commit.'
} elseif ($LASTEXITCODE -eq 1) {
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { throw 'git commit thất bại.' }
} else {
    throw 'Không thể kiểm tra thay đổi đã stage.'
}

git push
if ($LASTEXITCODE -ne 0) { throw 'git push thất bại.' }

Write-Host "Đã đồng bộ nhánh '$branch' lên $upstream."

//file này tối ưu hóa việc commit và push code lên git, nếu không có message thì sẽ yêu cầu nhập message
// cách sử dụng: ./sync.ps1 "message commit"
param(
    [Parameter(Position = 0)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Git was not found. Install Git and reopen PowerShell.'
}

$branch = git branch --show-current
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
    throw 'The current directory is not on a Git branch.'
}

$upstream = git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($upstream)) {
    throw "Branch '$branch' has no upstream. Set it first with: git push -u origin $branch"
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host 'Commit message'
}
if ([string]::IsNullOrWhiteSpace($Message)) {
    throw 'Commit message cannot be empty.'
}

git add -A
if ($LASTEXITCODE -ne 0) { throw 'git add failed.' }

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host 'No changes to commit.'
} elseif ($LASTEXITCODE -eq 1) {
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { throw 'git commit failed.' }
} else {
    throw 'Could not check staged changes.'
}

git push
if ($LASTEXITCODE -ne 0) { throw 'git push failed.' }

Write-Host "Synced branch '$branch' to $upstream."

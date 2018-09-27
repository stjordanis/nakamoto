const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const truncateAddress = (address) => {
  if (!address) return address

  return `${address.substring(0, 12)}...${address.substring(address.length-12)}`
}

export { isNumber, truncateAddress }

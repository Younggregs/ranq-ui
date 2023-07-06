const bgColor = () => {
    const colors = [
      '#ff0000',
      '#E14817',
      '#0000ff',
      '#AA69FF',
      '#23CEC9',
      '#ED9174',
      '#00D17E',
      '#F27190',
    ]

    return colors[Math.floor(Math.random() * colors.length)];

  }

export default bgColor;
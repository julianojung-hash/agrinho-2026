let tela = "tutorial"; 
let produtos = [];
let dadosAgro = [
  { cultura: "Soja", producao: 22, cor: "#2ecc71", info: "Maior produtor nacional" },
  { cultura: "Milho", producao: 15, cor: "#f1c40f", info: "Alta produtividade na safrinha" },
  { cultura: "Trigo", producao: 3.5, cor: "#e67e22", info: "Líder na produção de inverno" }
];

let caixaFazenda = 250; 
let defensivoEstoque = 3; 
let temTrabalhador = false; 
let mensagemAjudanteTimer = 0;

let sementes = {
  soja: 1,
  milho: 2,
  trigo: 1
};

let culturaSelecionada = "soja"; 

let economiaCultura = {
  soja: { nome: "Soja", precoVenda: 60, cor: "#2ecc71" },
  milho: { nome: "Milho", precoVenda: 40, cor: "#f1c40f" },
  trigo: { nome: "Trigo", precoVenda: 110, cor: "#e67e22" }
};

let lotes = [
  { id: 0, x: 40,  y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
  { id: 1, x: 150, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
  { id: 2, x: 260, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
  { id: 3, x: 370, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" }
];

function setup() {
  createCanvas(900, 600);

  produtos = [
    { id: 1, nome: "Sementes de Soja (Saco)", preco: 20, x: 530, y: 160, largura: 330, altura: 55, tipo: "semente_soja" },
    { id: 2, nome: "Sementes de Milho (Saco)", preco: 15, x: 530, y: 225, largura: 330, altura: 55, tipo: "semente_milho" },
    { id: 3, nome: "Sementes de Trigo (Saco)", preco: 35, x: 530, y: 290, largura: 330, altura: 55, tipo: "semente_trigo" },
    { id: 4, nome: "Defensivo Químico PR (L)", preco: 15, x: 530, y: 355, largura: 330, altura: 55, tipo: "defensivo" },
    { id: 5, nome: "Expandir Terras (+4 Lotes)", preco: 735, x: 530, y: 420, largura: 330, altura: 55, tipo: "expansao" },
    { id: 6, nome: "Trabalhador Automatizado (Anti-Pragas)", preco: 1512, x: 530, y: 485, largura: 330, altura: 55, tipo: "trabalhador" }
  ];
}

function draw() {
  background("#f4f7f6");

  if (tela === "tutorial") {
    desenharTutorial();
    return;
  }

  desenharCabecalho();
  desenharMenu();

  if (tela === "jogo") {
    atualizarEDesenharJogo();
  } else if (tela === "mercado") {
    desenharMercado();
  } else if (tela === "painel") {
    desenharPainelDados();
  }
}

function desenharTutorial() {
  fill("rgba(27, 77, 62, 0.95)");
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(32);
  text("COMO JOGAR - AGRO FORTE PARANÁ", width / 2, 80);

  textSize(18);
  text("Entenda as funções do sistema para prosperar no campo:", width / 2, 130);

  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(14);

  let xTexto = 150;
  
  textStyle(BOLD); fill("#2ecc71");
  text("1. Minha Lavoura (Jogo):", xTexto, 180);
  textStyle(NORMAL); fill(255);
  text("Aqui você gerencia sua fazenda. Selecione a cultura desejada no painel direito e clique em um lote vazio para plantar. Fique atento às pragas! Quando a barra atingir 100%, clique no lote para colher e receber seus lucros.", xTexto, 200, 600);

  textStyle(BOLD); fill("#f1c40f");
  text("2. Mercado Agro (Compras):", xTexto, 270);
  textStyle(NORMAL); fill(255);
  text("Use o dinheiro obtido com as vendas para reabastecer seu estoque de sementes e defensivos. Você também pode expandir seu território por R$ 735,00 ou contratar o Trabalhador Automatizado por um salário mínimo (R$ 1.512,00) para eliminar as pragas automaticamente.", xTexto, 290, 600);

  textStyle(BOLD); fill("#e67e22");
  text("3. Painel de Dados (Estatísticas):", xTexto, 360);
  textStyle(NORMAL); fill(255);
  text("Exibe gráficos reais e informativos sobre a estimativa de produção agrícola do estado do Paraná. Passe o mouse sobre as barras para ver detalhes e curiosidades de cada cultura.", xTexto, 380, 600);

  textStyle(BOLD); fill("#5da4ff");
  text(" Mecânica de Pragas & Automação:", xTexto, 450);
  textStyle(NORMAL); fill(255);
  text("Plantações infectadas perdem progresso. Se você tiver o Trabalhador Contratado e defensivos em estoque, ele gastará o insumo e salvará a planta imediatamente. Atenção: contratá-lo aumenta o surgimento de pragas em 25%!", xTexto, 470, 600);

  fill("#2ecc71");
  rect(width / 2 - 100, 520, 200, 45, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text("Começar Jogo", width / 2, 542);
  textAlign(LEFT, BASELINE);
}

function desenharCabecalho() {
  fill("#1b4d3e");
  noStroke();
  rect(0, 0, width, 80);

  fill(255);
  textSize(24);
  textStyle(BOLD);
  text("AGRO FORTE PARANÁ", 30, 45);

  textSize(13);
  textStyle(NORMAL);
  text("Monitoramento, Sustentabilidade e Negócios do Campo", 30, 65);
}

function desenharMenu() {
  desenharBotaoMenu("Minha Lavoura 🌾", 440, 22, 140, 35, (tela === "jogo"));
  desenharBotaoMenu("Mercado Agro", 595, 22, 130, 35, (tela === "mercado"));
  desenharBotaoMenu("Painel de Dados", 740, 22, 130, 35, (tela === "painel"));
}

function desenharBotaoMenu(texto, x, y, l, a, ativo) {
  if (ativo) fill("#2ecc71");
  else fill("#2c3e50");
  rect(x, y, l, a, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(texto, x + l / 2, y + a / 2);
  textAlign(LEFT, BASELINE);
}

function atualizarEDesenharJogo() {
  fill("#2c3e50");
  textSize(19);
  textStyle(BOLD);
  text("Simulador de Safra Paranaense — Gestão Física de Lotes", 40, 120);

  fill(255);
  stroke("#cbd5e1");
  rect(40, 145, 450, 50, 8);
  noStroke();
  fill("#1b4d3e");
  textSize(14);
  textStyle(BOLD);
  text("Caixa: R$ " + Math.floor(caixaFazenda), 55, 175);
  fill("#27ae60");
  text("Sementes (S/M/T): " + sementes.soja + "/" + sementes.milho + "/" + sementes.trigo, 175, 175);
  fill("#e67e22");
  text("Defensivos: " + defensivoEstoque, 365, 175);

  fill(255);
  stroke("#e2e8f0");
  rect(510, 145, 350, 415, 8);
  
  noStroke();
  fill("#2c3e50");
  textSize(14);
  textStyle(BOLD);
  text("Cultura Selecionada para Plantar:", 535, 180);

  desenharBotaoSeletor("soja", "🌱 Soja (Retorno: R$60)", 535, 205, culturaSelecionada === "soja");
  desenharBotaoSeletor("milho", "🌽 Milho (Retorno: R$40)", 535, 250, culturaSelecionada === "milho");
  desenharBotaoSeletor("trigo", "🌾 Trigo (Retorno: R$110)", 535, 295, culturaSelecionada === "trigo");

  fill("#7f8c8d");
  textSize(12);
  textStyle(NORMAL);
  text("Manual Rápido do Produtor:", 535, 365);
  text("• Escolha a cultura acima antes de clicar no lote vazio.", 535, 390);
  text("• Se surgir praga (⚠️), clique no lote para tratar.", 535, 415);
  text("• Lotes Dourados estão prontos para colheita e lucro.", 535, 440);
  
  if (temTrabalhador) {
    fill("#27ae60");
    textStyle(BOLD);
    text("🤖 Trabalhador Automatizado Ativo (+25% Pragas)", 535, 475);
    textStyle(NORMAL);
  }

  if (mensagemAjudanteTimer > 0) {
    fill("#2980b9");
    textSize(12);
    textStyle(BOLD);
    text("✨ O ajudante eliminou uma praga!", 535, 505);
    textStyle(NORMAL);
    mensagemAjudanteTimer--;
  }

  let chancePraga = temTrabalhador ? 2.5 : 2.0;

  for (let lote of lotes) {
    if (lote.estado === "vazio") fill("#8a6d51"); 
    else if (lote.estado === "plantado") fill(economiaCultura[lote.cultura].cor);
    else if (lote.estado === "pronto") fill("#f1c40f"); 
    else if (lote.estado === "estragado") fill("#7f8c8d"); 

    stroke(255);
    strokeWeight(2);
    rect(lote.x, lote.y, 100, 110, 6);
    noStroke();

    if (lote.estado === "plantado") {
      lote.progresso += 0.25;

      if (!lote.temPraga && random(1200) < chancePraga) {
        lote.temPraga = true;
      }

      if (lote.temPraga && temTrabalhador && defensivoEstoque > 0) {
        defensivoEstoque--;
        lote.temPraga = false;
        lote.progresso += 20;
        mensagemAjudanteTimer = 150;
      }

      if (lote.temPraga) {
        lote.progresso -= 0.5; 
        fill("#c0392b");
        rect(lote.x + 4, lote.y + 4, 92, 18, 3);
        fill(255);
        textSize(8);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("⚠️ PRAGA", lote.x + 50, lote.y + 13);
        textAlign(LEFT, BASELINE);
      }

      fill(255, 160);
      rect(lote.x + 10, lote.y + 90, 80, 8, 2);
      fill("#2ecc71");
      let wProgresso = map(lote.progresso, 0, 100, 0, 80);
      rect(lote.x + 10, lote.y + 90, wProgresso, 8, 2);

      if (lote.progresso >= 100) { lote.estado = "pronto"; lote.progresso = 100; }
      if (lote.progresso <= 0) { lote.estado = "estragado"; lote.temPraga = false; }
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    if (lote.estado === "vazio") {
      text("TERRA\nVAZIA", lote.x + 50, lote.y + 55);
    } else if (lote.estado === "plantado") {
      text(lote.cultura.toUpperCase() + "\n" + Math.floor(lote.progresso) + "%", lote.x + 50, lote.y + 55);
    } else if (lote.estado === "pronto") {
      text(lote.cultura.toUpperCase() + "\nPRONTA!", lote.x + 50, lote.y + 55);
    } else if (lote.estado === "estragado") {
      text("PERDA\nTOTAL", lote.x + 50, lote.y + 55);
    }
    textAlign(LEFT, BASELINE);
  }
}

function desenharBotaoSeletor(tipo, rotulo, x, y, ativo) {
  if (ativo) fill("#1b4d3e");
  else fill("#cbd5e1");
  rect(x, y, 300, 35, 6);
  
  if (ativo) fill(255);
  else fill("#2c3e50");
  textSize(12);
  textStyle(BOLD);
  text(rotulo, x + 15, y + 21);
}

function desenharMercado() {
  fill("#2c3e50");
  textSize(20);
  textStyle(BOLD);
  text("Vitrine de Insumos Agrícolas Tecnológicos", 40, 130);

  for (let p of produtos) {
    fill(255);
    stroke("#e2e8f0");
    strokeWeight(1);
    rect(p.x, p.y, p.largura, p.altura, 8);

    noStroke();
    fill("#2c3e50");
    textSize(11);
    textStyle(BOLD);
    text(p.nome, p.x + 12, p.y + 20);

    fill("#2ecc71");
    textSize(12);
    if(p.preco === Infinity) text("Adquirido", p.x + 12, p.y + 40);
    else text("R$ " + p.preco.toFixed(2), p.x + 12, p.y + 40);

    if (p.preco !== Infinity) {
      fill("#1b4d3e");
      rect(p.x + p.largura - 95, p.y + 14, 85, 26, 4);
      fill(255);
      textSize(11);
      textAlign(CENTER, CENTER);
      text("Comprar", p.x + p.largura - 52, p.y + 27);
      textAlign(LEFT, BASELINE);
    }
  }

  fill(255);
  stroke("#cbd5e1");
  rect(40, 190, 460, 365, 8);

  noStroke();
  fill("#1b4d3e");
  textSize(18);
  textStyle(BOLD);
  text("Finanças e Galpão de Insumos", 60, 230);

  fill("#2c3e50");
  textSize(14);
  textStyle(NORMAL);
  text("💰 Saldo em Conta: R$ " + caixaFazenda.toFixed(2), 60, 280);
  
  fill("#2ecc71");
  text("🌱 Sementes de Soja: " + sementes.soja + " sacos", 60, 320);
  fill("#f1c40f");
  text("🌽 Sementes de Milho: " + sementes.milho + " sacos", 60, 350);
  fill("#e67e22");
  text("🌾 Sementes de Trigo: " + sementes.trigo + " sacos", 60, 380);
  
  fill("#2c3e50");
  text("🧪 Defensivos em Estoque: " + defensivoEstoque + " L", 60, 430);
  text("🚜 Capacidade Territorial: " + lotes.length + " / 8 Lotes ocupados", 60, 470);
  
  if (temTrabalhador) {
    fill("#27ae60");
    textStyle(BOLD);
    text("🤖 Ajudante Automatizado: Contratado", 60, 510);
    textStyle(NORMAL);
  }
}

function desenharPainelDados() {
  fill("#2c3e50");
  textSize(20);
  textStyle(BOLD);
  text("Painel de Produção Estimada (Milhões de Toneladas)", 40, 130);

  let inicioX = 70;       
  let inicioY = 420;let tela = "tutorial"; 
2
let produtos = [];
3
let dadosAgro = [
4
  { cultura: "Soja", producao: 22, cor: "#2ecc71", info: "Maior produtor nacional" },
5
  { cultura: "Milho", producao: 15, cor: "#f1c40f", info: "Alta produtividade na safrinha" },
6
  { cultura: "Trigo", producao: 3.5, cor: "#e67e22", info: "Líder na produção de inverno" }
7
];
8
​
9
let caixaFazenda = 250; 
10
let defensivoEstoque = 3; 
11
let temTrabalhador = false; 
12
let mensagemAjudanteTimer = 0;
13
​
14
let sementes = {
15
  soja: 1,
16
  milho: 2,
17
  trigo: 1
18
};
19
​
20
let culturaSelecionada = "soja"; 
21
​
22
let economiaCultura = {
23
  soja: { nome: "Soja", precoVenda: 60, cor: "#2ecc71" },
24
  milho: { nome: "Milho", precoVenda: 40, cor: "#f1c40f" },
25
  trigo: { nome: "Trigo", precoVenda: 110, cor: "#e67e22" }
26
};
27
​
28
let lotes = [
29
  { id: 0, x: 40,  y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
30
  { id: 1, x: 150, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
31
  { id: 2, x: 260, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" },
32
  { id: 3, x: 370, y: 230, estado: "vazio", progresso: 0, temPraga: false, cultura: "" }
33
];
34
​
35
function setup() {
36
  createCanvas(900, 600);
37
​
38
  produtos = [
39
    { id: 1, nome: "Sementes de Soja (Saco)", preco: 20, x: 530, y: 160, largura: 330, altura: 55, tipo: "semente_soja" },
40
    { id: 2, nome: "Sementes de Milho (Saco)", preco: 15, x: 530, y: 225, largura: 330, altura: 55, tipo: "semente_milho" },
41
    { id: 3, nome: "Sementes de Trigo (Saco)", preco: 35, x: 530, y: 290, largura: 330, altura: 55, tipo: "semente_trigo" },
42
    { id: 4, nome: "Defensivo Químico PR (L)", preco: 15, x: 530, y: 355, largura: 330, altura: 55, tipo: "defensivo" },
43
    { id: 5, nome: "Expandir Terras (+4 Lotes)", preco: 735, x: 530, y: 420, largura: 330, altura: 55, tipo: "expansao" },
  let larguraBarra = 70;  
  let espaco = 100;       

  stroke("#bdc3c7");
  strokeWeight(2);
  line(40, inicioY, 520, inicioY); 

  for (let i = 0; i < dadosAgro.length; i++) {
    let dado = dadosAgro[i];
    let alturaBarra = map(dado.producao, 0, 25, 0, 240);
    let barraX = inicioX + (i * (larguraBarra + espaco));

    fill(dado.cor);
    noStroke();
    rect(barraX, inicioY - alturaBarra, larguraBarra, alturaBarra, 6, 6, 0, 0);

    fill("#2c3e50");
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(14);
    text(dado.cultura, barraX + larguraBarra / 2, inicioY + 25);

    textSize(13);
    textStyle(NORMAL);
    text(dado.producao + " M/T", barraX + larguraBarra / 2, inicioY - alturaBarra - 12);
    textAlign(LEFT); 

    if (mouseX > barraX && mouseX < barraX + larguraBarra && mouseY > inicioY - alturaBarra && mouseY < inicioY) {
      fill("rgba(44, 62, 80, 0.95)"); 
      noStroke();
      let larguraBalao = 150;
      let xBalao = (barraX + larguraBarra / 2) - (larguraBalao / 2);
      rect(xBalao, inicioY - alturaBarra - 60, larguraBalao, 40, 6);
      
      fill(255); 
      textSize(11);
      textStyle(NORMAL);
      textAlign(CENTER, CENTER);
      text(dado.info, xBalao + larguraBalao / 2, inicioY - alturaBarra - 40);
      textAlign(LEFT, BASELINE); 
    }
  }

  fill(255);
  stroke("#e2e8f0");
  strokeWeight(1);
  rect(600, 160, 260, 310, 12);

  noStroke();
  fill("#1b4d3e");
  textSize(15);
  textStyle(BOLD);
  text("Destaque Econômico\n& Ambiental", 615, 195);

  fill("#555555");
  textSize(12);
  textStyle(NORMAL);
  let relatorio = "O Paraná se consolida como um dos principais motores do agronegócio brasileiro.\n\nA transição para práticas sustentáveis e cooperativas tecnológicas garante a liderança produtiva e a conservação da nossa terra rica.";
  text(relatorio, 615, 240, 230, 210);
}

function mousePressed() {
  if (tela === "tutorial") {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > 520 && mouseY < 565) {
      tela = "jogo";
    }
    return;
  }

  if (mouseX > 440 && mouseX < 580 && mouseY > 22 && mouseY < 57) tela = "jogo";
  if (mouseX > 595 && mouseX < 725 && mouseY > 22 && mouseY < 57) tela = "mercado";
  if (mouseX > 740 && mouseX < 870 && mouseY > 22 && mouseY < 57) tela = "painel";

  if (tela === "mercado") {
    for (let p of produtos) {
      let bX = p.x + p.largura - 95;
      let bY = p.y + 14;
      if (mouseX > bX && mouseX < bX + 85 && mouseY > bY && mouseY < bY + 26 && p.preco !== Infinity) {
        if (caixaFazenda >= p.preco) {
          caixaFazenda -= p.preco;
          if (p.tipo === "semente_soja") sementes.soja++;
          if (p.tipo === "semente_milho") sementes.milho++;
          if (p.tipo === "semente_trigo") sementes.trigo++;
          if (p.tipo === "defensivo") defensivoEstoque++;
          if (p.tipo === "trabalhador") {
            temTrabalhador = true;
            p.preco = Infinity;
          }
          if (p.tipo === "expansao") {
            let idAtual = lotes.length;
            lotes.push({ id: idAtual,     x: 40,  y: 360, estado: "vazio", progresso: 0, temPraga: false, cultura: "" });
            lotes.push({ id: idAtual + 1, x: 150, y: 360, estado: "vazio", progresso: 0, temPraga: false, cultura: "" });
            lotes.push({ id: idAtual + 2, x: 260, y: 360, estado: "vazio", progresso: 0, temPraga: false, cultura: "" });
            lotes.push({ id: idAtual + 3, x: 370, y: 360, estado: "vazio", progresso: 0, temPraga: false, cultura: "" });
            p.preco = Infinity; 
          }
        } else {
          alert("Saldo insuficiente em caixa!");
        }
      }
    }
  }

  if (tela === "jogo") {
    if (mouseX > 535 && mouseX < 835) {
      if (mouseY > 205 && mouseY < 240) culturaSelecionada = "soja";
      if (mouseY > 250 && mouseY < 285) culturaSelecionada = "milho";
      if (mouseY > 295 && mouseY < 330) culturaSelecionada = "trigo";
    }

    for (let lote of lotes) {
      if (mouseX > lote.x && mouseX < lote.x + 100 && mouseY > lote.y && mouseY < lote.y + 110) {
        if (lote.estado === "vazio") {
          if (sementes[culturaSelecionada] > 0) {
            sementes[culturaSelecionada]--;
            lote.estado = "plantado";
            lote.cultura = culturaSelecionada;
            lote.progresso = 15;
            lote.temPraga = false;
          }
        }
        else if (lote.estado === "plantado" && lote.temPraga) {
          if (defensivoEstoque > 0) {
            defensivoEstoque--;
            lote.temPraga = false;
            lote.progresso += 20; 
          }
        }
        else if (lote.estado === "pronto") {
          caixaFazenda += economiaCultura[lote.cultura].precoVenda;
          lote.estado = "vazio";
          lote.progresso = 0;
          lote.cultura = "";
        }
        else if (lote.estado === "estragado") {
          lote.estado = "vazio";
          lote.progresso = 0;
          lote.cultura = "";
        }
      }
    }
  }
}

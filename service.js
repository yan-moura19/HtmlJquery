const baseUrlAPI = 'https://api.coincap.io/v2/assets'

$(document).ready(() => getData())

$(document).ready(function() {
    $("button").click(function() {
       
        
        const moedaId = $("input").val();
        
        if(moedaId) {
            getData(moedaId);
            $("input").val("");
        } else {
            $("#mymodal").modal("show");
            $("#modal-message").html("Digite uma moeda que exista");
        }
    });
   
  });


function getData(nome){
    let url = baseUrlAPI

    if(nome){
        
        url += '/' + nome
        $('#page2').show()
        $('#page1').hide()
    }else{
        showPage1()
    }
    $.ajax({
        url: url,
        type: 'GET'
    }).done(function(data){
        if(nome){
            
            formatMoeda(nome)
           
        }else{
            formatedMoedas(data)
           
        }
    })
    .fail(function(msg){
        const error = msg.responseJSON.message

        if(error === 'Not Found'){
            $('#mymodal').modal("show")
            $('#modal-message').html("Moeda inválida")
            showPage1()
        }
    })
}
function showPage1(){
    $(".card-title").empty()
    $("#page2").hide()
    $("#page1").show()
}
function formatMoeda(moeda){
    
    clearCard()
    const formatedMoeda = getMoeda(moeda)
    const htmlPrecoEVar = `<strong>Preco</strong>${moeda.preco}<br>
                            <strong>Variação</strong>${moeda.variacao}<br>
        `
    $(".card-title").append(moeda.id)
    $('#link').append(htmlPrecoEVar)

}
function clearCard(){
    $(".card-title").empty()
    $('#link').empty()
}
function formatedMoedas(data){
    
    let moedas = []
    for(let i = 0; i < data.data.length; i++){
        
        moedas.push(getMoeda(data.data[i]))
    }
    showMoedas(moedas)
}
function getMoeda(moeda){
    
    return{
        preco: moeda.priceUsd,
        variacao: moeda.changePercent24Hr,
        id : moeda.id
    }
   
}
function showMoedas(moedas){
   
    for(let i=0; i<moedas.length;i++){
        let precoFormater = parseFloat(moedas[i].preco)
        let precoFormatado = precoFormater.toFixed(3)
        let variacaoFormater = parseFloat(moedas[i].variacao)
        let variacaoFormatado = variacaoFormater.toFixed(3)
        $('#cripto-data').append(
            "<tr>" + 
            "<td>" + moedas[i].id + "</td>" +
            "<td>" + precoFormatado + "</td>" +
            "<td>" + variacaoFormatado + "</td>" +
            "</tr>" 
        )
    }
    
}


